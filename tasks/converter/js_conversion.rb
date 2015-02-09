class Converter
  module JsConversion
    def process_javascript_assets
      log_status 'Processing javascripts...'
      save_to = @save_to[:js]
      contents = {}
      path =  File.dirname(__FILE__) + '/../../js'
      bootstrap_js_files = Dir.entries(path).select{ |e| File.file? "#{path}/#{e}" and e =~ /\.(js)$/}
      bootstrap_js_files.each do |name|
        file = File.open("#{path}/#{name}").read
        contents[name] = file
        save_file("./assets/javascripts/bootstrap/#{name}", file)
      end
      log_processed "#{bootstrap_js_files * ' '}"

      log_status 'Updating javascript manifest'
      manifest = ''
      cat = ''
      bootstrap_js_files.each do |name|
        cat << contents[name] + "\n"
        name = name.gsub(/\.js$/, '')
        manifest << "//= require ./bootstrap/#{name}\n"
      end
      {'assets/javascripts/bootstrap-sprockets.js' => manifest,
       'assets/javascripts/bootstrap.js' => cat}.each do |path, content|
        save_file path, content
        log_processed path
      end
    end
    # def read_files(path, files)
    #   full_path = "https://raw.github.com/#@repo/#@branch_sha/#{path}"
    #   contents = read_cached_files(path, files)
    #   log_http_get_files contents.keys, full_path, true if contents.keys
    #   files -= contents.keys
    #   log_http_get_files files, full_path, false
    #   files.map do |name|
    #     Thread.start {
    #       content = open("#{full_path}/#{name}").read
    #       Thread.exclusive { write_cached_files path, name => content }
    #     }
    #   end.each(&:join)
    #   contents
    # end

  end
end
